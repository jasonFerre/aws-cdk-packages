import json


def handler(event, conttext):
    return {
        'statusCode': 200,
        'body': json.dumps('ok')
    }
