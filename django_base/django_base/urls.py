from django.views.decorators.cache import cache_page
from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'channel/(?P<title>.+)/$', views.channel, name='channel'),
    url(r'^api/', include('api.urls')),
    url(r'^api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^', cache_page(60 * 15)(views.cate)),
]
