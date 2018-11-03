from pymongo import MongoClient
from bson.objectid import ObjectId
import os

os.system("echo ----------------------------------------")
os.system("echo --- USER MUST HAVE PYTHON3 installed ---")
os.system("echo ----------------------------------------")

print('\n')

os.system("echo ================================")
os.system("echo RUNNING SCRIPT TO INSALL PYMONGO")
os.system("echo ================================")
os.system('pip install pymongo')

client = MongoClient('localhost', 27017)

client.drop_database('perigo')

db = client.perigo

meetup_location = db.MeetupLocation
message = db.Message
item = db.Item
user = db.User
review = db.Review

locations = [
	{'locationName' : 'Tommy Trojan',  'zipCode': 90089, 'address' : '123 Sesame St.'},
	{'locationName' : 'Lyon Center', 'zipCode': 90089, 'address' : '123 Sesame St.'},
	{'locationName' : 'USC Village Starbucks', 'zipCode': 90089, 'address' : '123 Sesame St.'},
	{'locationName' : 'Blaze Pizza', 'zipCode': 90089, 'address' : '123 Sesame St.'},
	{'locationName' : 'Ronald Tutor Campus Center', 'zipCode': 90089, 'address' : '123 Sesame St.'},
	{'locationName' : 'Fertitta Hall', 'zipCode': 90089, 'address' : '123 Sesame St.'},
	{'locationName' : 'Chick-fil-A', 'zipCode': 90089, 'address' : '123 Sesame St.'},
	{'locationName' : 'Leavy Library', 'zipCode': 90089, 'address' : '123 Sesame St.'}
]

print("=====================================================")
print("RUNNING SCRIPT TO INSERT SAMPLE VALUES INTO DB PERIGO")
print("=====================================================")

for location in locations:
	meetup_location.insert_one(location)
print("CREATED LOCATION COLLECTION")

itemInserted1 = item.insert_one({'title' : 'Bruin Bear', 'description' : 'Worst mascot ever', 
	'condition' : 'Poor', 'forSale' : True, 'userSellingItem' : ObjectId(), 
	'highestBidder' : ObjectId(), 'endForSaleDate' : 12342153, 'startForSaleDate' : 12342100, 'maxBid' : 0,
	'image' : 'https://pbs.twimg.com/profile_images/952872960767025152/t_ssj_Uy_400x400.jpg',
	'location' : 'Los Angeles, CA', 'usersWatching' : [{'userWatchingId' : ObjectId()}]
	})
itemInserted2 = item.insert_one({'title' : 'Stanford Cardinal', 'description' : 'Inferior football team',
	'condition' : 'Poor', 'forSale' : True, 'userSellingItem' : ObjectId(),
	'highestBidder' : ObjectId(), 'endForSaleDate' : 12342153, 'startForSaleDate' : 12342100, 'maxBid' : 0,
	'image' : 'http://web.stanford.edu/~siegelr/stanford/homecoming2014/IMG_8867%20trees%2010-25-2014%20stanford%20stadium.JPG',
	'location' : 'Los Angeles, CA', 'usersWatching' : [{'userWatchingId' : ObjectId()}]
	})
print("CREATED ITEM COLLECTION")



user.insert_one({'firstName' : 'Tommy', 'lastName' : 'Trojan', 
	'phoneNumber' : '213-123-4567', 'zipCode' : 90089,
	'googleUserId' : '1234567', 'userRating' : 5, 
	'savedItems' : [{'itemId' : itemInserted1.inserted_id}, {'itemId' : itemInserted2.inserted_id}]
	})
print("CREATED USER COLLECTION")

message.insert_one({'content' : 'This is a test message. Fight On!',
	'userSendingMessage' : ObjectId(), 'userReceivingMessage' : ObjectId()})
print("CREATED MESSAGE COLLECTION")

review.insert_one({'reviewMessage' : 'Great seller', 'reviewerId' : ObjectId(),
	'userBeingReviewed' : ObjectId()})
print("CREATED REVIEW COLLECTION")

print("=====================================================")
print("SUCCESFUL INSTALL AND DB CREATION. GOODBYE!")
print("=====================================================")
