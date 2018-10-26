from pymongo import MongoClient
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
	{'locationName' : 'Tommy Trojan',  'zipCode': 90089, 'address' : None},
	{'locationName' : 'Lyon Center', 'zipCode': 90089, 'address' : None},
	{'locationName' : 'USC Village Starbucks', 'zipCode': None, 'address' : None},
	{'locationName' : 'Blaze Pizza', 'zipCode': 90089, 'address' : None},
	{'locationName' : 'Ronald Tutor Campus Center', 'zipCode': None, 'address' : None},
	{'locationName' : 'Fertitta Hall', 'zipCode': 90089, 'address' : None},
	{'locationName' : 'Chick-fil-A', 'zipCode': 90089, 'address' : None},
	{'locationName' : 'Leavy Library', 'zipCode': 90089, 'address' : None}
]

print("=====================================================")
print("RUNNING SCRIPT TO INSERT SAMPLE VALUES INTO DB PERIGO")
print("=====================================================")

for location in locations:
	meetup_location.insert_one(location)
print("CREATED LOCATION COLLECTION")

item.insert_one({'title' : 'Bruin Bear', 'description' : 'Worst mascot ever', 
	'condition' : 'Poor', 'forSale' : True, 'userSellingItem' : '1234567', 
	'highestBidder' : '8765432', 'endForSaleDate' : 12342153, 'startForSaleDate' : 12342100, 'maxBid' : 0})
print("CREATED ITEM COLLECTION")

user.insert_one({'firstName' : 'Tommy', 'lastName' : 'Trojan', 
	'phoneNumber' : '213-123-4567', 'zipCode' : 90089,
	'googleUserId' : '1234567', 'userRating' : 5})
print("CREATED USER COLLECTION")

message.insert_one({'content' : 'This is a test message. Fight On!',
	'userSendingMessage' : '1234567', 'userReceivingMessage' : None})
print("CREATED MESSAGE COLLECTION")

review.insert_one({'reviewMessage' : 'Great seller', 'reviewerId' : None,
	'userBeingReviewed' : '1234567'})
print("CREATED REVIEW COLLECTION")

print("=====================================================")
print("SUCCESFUL INSTALL AND DB CREATION. GOODBYE!")
print("=====================================================")
