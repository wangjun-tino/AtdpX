

from django.conf.urls import url,patterns
from task_info.views import *


urlpatterns = [
      url(r'^query/$', taskQuery),
      url(r'^update/$', taskUpdate),
      url(r'^delete/$', taskDelete)

]

