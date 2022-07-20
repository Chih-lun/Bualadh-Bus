from rest_framework.response import Response
from rest_framework.decorators import api_view
from bus.models import current_weather
from .serializers import Weather_Serializer
from .parse_arguments import Parse_arguments

@api_view(['GET'])
def get_current_weather(request):
    # The credential is updated, so the function is not working now
    # weather = current_weather.objects.all()
    # serializer = Weather_Serializer(weather, many=True)
    # return Response(serializer.data)
    return Response({'status':'successful'})


@api_view(['POST'])
def user_input(request):
    print(request.data)
    return Response({'status':'successful'})