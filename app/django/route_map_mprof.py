from memory_profiler import profile
from datetime import datetime as dt
from api.route_map import RouteMap
import time

inputs = ['288', '7602', "Sunday"]

@profile
def get_RM(inputs):
  rm = RouteMap(inputs)
  res = rm.get_intermediate_stop_locations()
  return res

start = time.perf_counter()
get_RM(inputs)
end = time.perf_counter()

result = end - start

with open('timings.csv', 'a') as file:
  outcome = "route stop map"
  code_modification = "original"
  inputs = str(inputs).replace(",", "")
  
  file.write(f"\n{outcome},{code_modification},{inputs},{result}")