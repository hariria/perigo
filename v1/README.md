# Project Procedure V1:



### Perigo V1 Objective
Create a simple app for the USC community where people can buy, sell, or trade goods online.


### Procedure
1.  Begin by creating the backend using Node js and Mongo DB.
2.  Create a simple Frontend


<br>
Each listing has the following attributes:

##### Composition of Listing
```json
{
    "Listing": {
        "listId": "jdf29dkf38sikd",
        "price": 100,
        "owner": {
            "userId": "sldkfjlksjdf"
        },
        "description": "something for sale",
        "images": [
            {"image object 1"},
            {"image object 2"}
        ],
        "keywords": [
            "keyword1",
            "keyword2",
            "keyword3"
        ],
        "categoryId": "6000",
        "location": "zip code 90089",
        "title": "something",
        "timePosted": "datetime",
        "condition": "used",
        "purchaseDate": "N/A",
        "views": 100
    }
}
```

Each user should have the same attributes

##### Composition of User
```json
{
    "User":{
        "userId": "sldkfjlksjdf",
        "uscEmail": "example.usc.edu",
        "phoneNumber": "000-000-0000",
        "name": {
            "fName": "first",
            "lName": "last"
        },
        "listOfListings": [
            {"List Object"},
            {"List Object"}
        ],
        "listOfReviews": [
            {"Review one"},
            {"Review two"}
        ],
        "savedItems": [
            {"List Object"},
            {"List Object"}
        ],
        "zipCode": "00000"
    }
}
```
