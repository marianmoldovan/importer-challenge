from flask import Blueprint
from flask import request
from flask import jsonify
from flask import abort
from .db import mongo

bp = Blueprint('reader', __name__)

@bp.route('/query', methods = ['GET'])
def hello():
    limit = request.args.get('limit', 20, type=int)
    offset = request.args.get('offset', 0, type=int)
    query = build_query(request.args)
    data = mongo.db.data.find(query, limit=int(limit),
        skip=int(offset), projection={'_id': False})
    return jsonify(list(data))

def build_query(params):
    query = {}
    if 'country' in params:
        query['Country'] = request.args.get('country')
    if 'sector' in params:
        query['Sector'] = request.args.get('sector')
    if 'parent' in params:
        query['Parent sector'] = request.args.get('parent')
    return query
