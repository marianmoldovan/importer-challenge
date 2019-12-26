"""
Blueprint for the only domain in the app, reader
"""
from flask import Blueprint
from flask import request
from flask import jsonify
from .db import mongo


bp = Blueprint('reader', __name__)

@bp.route('/query', methods=['GET'])
def hello():
    """
    Handler for query endpoint. Process parameters, performs the query and returns the items found
    """
    limit = request.args.get('limit', 20, type=int)
    offset = request.args.get('offset', 0, type=int)
    query = build_query(request.args)
    data = mongo.db.data.find(query, limit=int(limit), skip=int(offset), projection={'_id': False})
    return jsonify(list(data))

def build_query(params):
    """
    Constructs the query dictionary with the desired parameters

    Args:
        params (dict): contains the url parameters sent to the endpoint

    Returns:
        dict: dictionary with the parameters set up in the dabatase
    """
    query = {}
    if 'country' in params:
        query['Country'] = request.args.get('country')
    if 'sector' in params:
        query['Sector'] = request.args.get('sector')
    if 'parent' in params:
        query['Parent sector'] = request.args.get('parent')
    return query
