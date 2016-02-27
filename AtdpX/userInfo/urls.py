

from django.conf.urls import url,patterns
from userInfo.views import userlistQuery


urlpatterns = [
      url(r'^query/$', userlistQuery),
]

