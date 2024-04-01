
from rest_framework import status, generics
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Event

from .permission import UserIsOwnerEvent
from .serializer import EventSerializer


# class EventListCreateAPIView(generics.ListCreateAPIView):
#     serializer_class = EventSerializer
#     permission_classes = [IsAuthenticated, UserIsOwnerEvent]
#
#     authentication_classes = [SessionAuthentication, TokenAuthentication]
#
#     def get_queryset(self):
#         return Event.objects.filter(user=self.request.user.id)
#
#     def perform_create(self, serializer):
#         new_event_data = serializer.validated_data
#         start_time = new_event_data.get('start_time')
#         end_time = new_event_data.get('end_time')
#
#         print(new_event_data)
#
#         if start_time == end_time:
#             print("Начало и конец совпадают")
#             return Response({'error': 'The beginning and the end of the event cannot be the same.'},
#                             status=status.HTTP_400_BAD_REQUEST)
#         else:
#             conflicting_events = Event.objects.filter(
#                 user=self.request.user,
#                 start_time__lt=end_time,
#                 end_time__gt=start_time,
#             )
#
#             if conflicting_events.exists():
#                 print("Конфликт найден")
#                 response_data = {'error': 'Conflict with existing events.',
#                                  'events': conflicting_events}
#                 return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
#             else:
#                 print("alcaoc")
#                 # serializer.save(user=self.request.user)
#                 instance = serializer.save(user=self.request.user)
#                 serialized_instance = EventSerializer(instance)
#                 return Response(serialized_instance.data, status=status.HTTP_201_CREATED)

class EventListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        response = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return response

    def perform_create(self, serializer):
        start_time = serializer.validated_data.get('start_time')
        end_time = serializer.validated_data.get('end_time')

        if start_time >= end_time:
            return Response({'error': 'End time must be after start time'}, status=status.HTTP_400_BAD_REQUEST)

        conflicting_events = (Event.objects.filter
                              (user=self.request.user,
                               start_time__lt=end_time,
                               end_time__gt=start_time)).order_by('start_time')
        if conflicting_events.exists():
            return Response({'error': 'Event time conflicts with existing event',
                             'events': conflicting_events.values()}, status=status.HTTP_400_BAD_REQUEST)

        instance = serializer.save(user=self.request.user)
        serialized_instance = EventSerializer(instance)
        return Response(serialized_instance.data, status=status.HTTP_201_CREATED)


class EventDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, UserIsOwnerEvent]
    # authentication_classes = [SessionAuthentication, TokenAuthentication]

    queryset = Event.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        new_event_data = serializer.validated_data
        start_time = new_event_data.get('start_time')
        end_time = new_event_data.get('end_time')

        if start_time >= end_time:
            if start_time >= end_time:
                return Response({'error': 'End time must be after start time'}, status=status.HTTP_400_BAD_REQUEST)
        elif start_time != end_time:
            conflicting_events = Event.objects.filter(
                user=request.user,
                start_time__lt=end_time,
                end_time__gt=start_time
            ).exclude(id=instance.id).order_by('start_time')  # Исключаем текущее событие из проверки конфликта

            if conflicting_events.exists():

                return Response({'error': 'Conflict with existing events.', 'events': conflicting_events.values()},
                                status=status.HTTP_400_BAD_REQUEST)
            else:
                self.perform_update(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

