from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from bus.models import current_weather
from .serializers import Weather_Serializer, TimetableSerializer
from api.timetables import DisplayTimetables
import pandas as pd
import json

@api_view(['GET'])
def get_current_weather(request):
    # The credential is updated, so the function is not working now
    weather = current_weather.objects.all()
    serializer = Weather_Serializer(weather, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def user_input(request):
    print(request.data)
    return Response({'status':'successful'})

@api_view(['GET'])
def get_timetable(request):
    df = DisplayTimetables.return_timetable('395', '395', 'Saturday')
    return Response(df)

@api_view(['POST'])
def user_timetable(request):
    print(request.data)
    time = request.data['time']
    start = request.data['location']
    end = request.data['destination']
    lst = [time, start, end]
    print('request: ', lst[0], lst[1], lst[2])
    j = JourneyTimes(lst)
    p=j.predict_total_journey_time()

    return Response({'result':p})
