from pydantic import BaseModel
from typing import Union, Dict, List, Any

JSONType = Union[str, int, float, bool, None, Dict[str, Any], List[Any]]

class ResponseModel(BaseModel):
    response: JSONType