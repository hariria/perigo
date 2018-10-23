from pymongo import MongoClient

client = MongoClient('localhost', 27017)

db = client.perigo

meetup_location = db.MeetupLocation
message = db.Message
item = db.Item
user = db.User

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

for location in locations:
	meetup_location.insert_one(location)


item.insert_one({'title' : 'Bruin Bear', 'description' : 'Worst mascot ever', 
	'condition' : 'Poor', 'forSale' : True, 'userSellingItem' : '1234567', 
	'highestBidder' : '8765432', 'endForSaleDate' : 12342153, 'startForSaleDate' : 12342100, 'maxBid' : 0})

user.insert_one({'firstName' : 'Tommy', 'lastName' : 'Trojan', 
	'phoneNumber' : '213-123-4567', 'zipCode' : 90089,
	'googleUserId' : '1234567'})

message.insert_one({'content' : 'This is a test message. Fight On!',
	'userSendingMessage' : '1234567', 'userReceivingMessage' : None})