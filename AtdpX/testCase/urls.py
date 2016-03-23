

from django.conf.urls import url,patterns
from testCase.views import *


urlpatterns = [
      url(r'^suiteQuery/$', testSuiteQuery),
      url(r'^suiteSubmit/$', testSuiteSubmit)
]

