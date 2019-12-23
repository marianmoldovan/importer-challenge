import pytest
import json

def test_index(client):
    response = client.get('/query')
    assert response.data
    assert type(json.loads(response.data)) is list
    assert response.status_code is 200
