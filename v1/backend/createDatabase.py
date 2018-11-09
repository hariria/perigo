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

college_mascots = ['Joe Bruin', 'Oski the Bear', 'Stanford Cardinal', 'Fighting Irish', 'OSU Buckeyes']

for i in range(0, 5):
	itemToInsert = item.insert_one({
			'title' : college_mascots[i],
			'description' : 'This is my test description',
			'condition' : 'Poor',
			'forSale' : True,
			'userSellingItem' : ObjectId(),
			'highestBidder' : ObjectId(),
			'endForSaleDate' : 12342153,
			'startForSaleDate' : 12342153,
			'maxBid' : 50,
			'image' : "https://picsum.photos/300/?image=" + str(i*i*i),
			'location' : 'Los Angeles, CA',
			'keywords' : ['college', 'mascot', 'tommy', 'trojan', 'USC'],
			'usersWatching' : []
		})

print("CREATED ITEM COLLECTION")

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
