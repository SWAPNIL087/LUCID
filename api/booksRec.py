def recommends(q):
    import pandas as pd
    import numpy as np
    import books
    book = pd.read_csv('C:/Users/91969/PycharmProjects/learn/bookdata/BX-Books.csv', sep=';', error_bad_lines=False, encoding="latin-1")
    book.columns = ['ISBN','bookTitle','bookAuthor','yearOfPublication','publisher','imageUrls','imageUrlM','imageUrlL']
    users = pd.read_csv('C:/Users/91969/PycharmProjects/learn/bookdata/BX-Users.csv',sep=';',error_bad_lines=False, encoding='latin-1')
    users.columns = ['userID','Location','Age']
    ratings = pd.read_csv('C:/Users/91969/PycharmProjects/learn/bookdata/BX-Book-Ratings.csv',sep=';',error_bad_lines=False,encoding='latin-1')
    ratings.columns = ['userID','ISBN','bookRating']

    '''print(ratings.shape)
    print(list(ratings.columns))

    plt.rc('font',size=15)
    ratings.bookRating.value_counts(sort=False).plot(kind='bar')
    plt.title('Rating Distribution\n')
    plt.xlabel('Rating')
    plt.ylabel('Count')
    plt.show()

    print(book.shape)
    print(list(book.columns))

    print(users.shape)
    print(list(users.columns))

    users.Age.hist(bins=[0,10,20,30,40,50,100])
    plt.title('Age Distribution')
    plt.xlabel('Age')
    plt.ylabel('count')
    plt.show()'''

    counts1 = ratings['userID'].value_counts()
    ratings = ratings[ratings['userID'].isin(counts1[counts1 >= 200].index)]
    counts = ratings['bookRating'].value_counts()
    ratings = ratings[ratings['bookRating'].isin(counts[counts >= 100].index)]

    combine_book_rating = pd.merge(ratings, book, on='ISBN')
    columns = ['yearOfPublication', 'publisher', 'bookAuthor', 'imageUrls', 'imageUrlM', 'imageUrlL']
    combine_book_rating = combine_book_rating.drop(columns, axis=1)
    combine_book_rating.head()


    combine_book_rating = combine_book_rating.dropna(axis = 0, subset = ['bookTitle'])

    book_ratingCount = (combine_book_rating.
        groupby(by = ['bookTitle'])['bookRating'].
        count().
        reset_index().
        rename(columns = {'bookRating': 'totalRatingCount'})
        [['bookTitle', 'totalRatingCount']]
        )
    book_ratingCount.head()

    rating_with_totalRatingCount = combine_book_rating.merge(book_ratingCount, left_on = 'bookTitle', right_on = 'bookTitle', how = 'left')
    rating_with_totalRatingCount.head()

    pd.set_option('display.float_format', lambda x: '%.3f' % x)
    #print(book_ratingCount['totalRatingCount'].describe())

    #print(book_ratingCount['totalRatingCount'].quantile(np.arange(.9, 1, .01)))

    popularity_threshold = 50
    rating_popular_book = rating_with_totalRatingCount.query('totalRatingCount >= @popularity_threshold')
    rating_popular_book.head()

    #print(rating_popular_book.shape)

    combined = rating_popular_book.merge(users, left_on = 'userID', right_on = 'userID', how = 'left')

    us_canada_user_rating = combined[combined['Location'].str.contains("usa|canada")]
    us_canada_user_rating=us_canada_user_rating.drop('Age', axis=1)
    us_canada_user_rating.head()

    from scipy.sparse import csr_matrix
    us_canada_user_rating = us_canada_user_rating.drop_duplicates(['userID', 'bookTitle'])
    us_canada_user_rating_pivot = us_canada_user_rating.pivot(index = 'bookTitle', columns = 'userID', values = 'bookRating').fillna(0)
    us_canada_user_rating_matrix = csr_matrix(us_canada_user_rating_pivot.values)

    from sklearn.neighbors import NearestNeighbors


    model_knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
    model_knn.fit(us_canada_user_rating_matrix)



    query_index = np.random.choice(us_canada_user_rating_pivot.shape[0])



    #typed_book_name = 'ProdigalSummer'
    typed_book_name = q
    '''must implement elastic search here'''



    if(typed_book_name in us_canada_user_rating_pivot.index):
        print("found")
        for i in range(len(us_canada_user_rating_pivot.index)):
            if(us_canada_user_rating_pivot.index[i]==typed_book_name):
                query_index=i
                break
        #query_index =us_canada_user_rating_pivot.index.index(typed_book_name)

    distances, indices = model_knn.kneighbors(us_canada_user_rating_pivot.iloc[query_index,:].values.reshape(1, -1), n_neighbors = 6)
    us_canada_user_rating_pivot.iloc[query_index,:].values.reshape(1,-1)
    result=[]
    for i in range(0, len(distances.flatten())):
        if i == 0:
            print('Recommendations for {0}:\n'.format(us_canada_user_rating_pivot.index[query_index]))
        else:
            result.append(us_canada_user_rating_pivot.index[indices.flatten()[i]])
            #print(i, us_canada_user_rating_pivot.index[indices.flatten()[i]])
    store={}
    
    store[0] = books.search_books(result)
    return store