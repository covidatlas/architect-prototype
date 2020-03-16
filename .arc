@app
covidatlas

@aws
profile covidatlas
region us-west-1

@cdn

@http
get /
# get /api/:place TODO

@events
tracker

# @scheduled
# runner rate(1 hour)

@tables
data
  id *String
  date **String

all-updates
  id *String
  created **String
