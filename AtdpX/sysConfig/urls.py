

from django.conf.urls import url,patterns
from sysConfig.views import *


urlpatterns = [
      url(r'^query/$', sysConfigQuery),
      url(r'^update/$', sysConfigUpdate),
      url(r'^delete/$', sysConfigDelete)

]

