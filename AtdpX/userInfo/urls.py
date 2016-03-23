

from django.conf.urls import url,patterns
from userInfo.views import *


urlpatterns = [
      url(r'^query/$', userlistQuery),
      url(r'^update/$',userUpdate),
      url(r'^delete/$',userDelete),
      url(r'^login/$',userLogin),
]

