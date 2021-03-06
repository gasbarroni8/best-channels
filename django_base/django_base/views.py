from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from django.conf import settings
from playlist.models import Playlist
from inner.models import Inner
from outer.models import Outer


def cate(request):
    return render(request, 'cate.html')


def why(request):
    return render(request, 'why.html')


def channel(request, title):
    channel = get_object_or_404(Playlist, channel_title=title)
    return render(
        request, 'channel.html',
        {
            'title': channel.channel_title,
            'create_time': channel.create_time,
            'channel_id': channel.channel_id,
        })


def category(request, title):
    host = settings.SITE_URL
    inner_object = Inner.objects.filter(outer__name=title)
    if inner_object.count() == 0:
        return render(request, '404.html')
    return render(
        request, 'num_cate.html',
        {
            'title': title,
            'object_set': inner_object,
            'host': host,
        }
    )


def all(request):
    '''
    Get all category
    '''
    host = settings.SITE_URL
    outer_object = Outer.objects.all()
    return render(
        request, 'num_cate.html',
        {
            'title': 'All Categories',
            'object_set': outer_object,
            'host': host,
        }
    )


def sub_category(request, title, sub):
    host = settings.SITE_URL
    return render(
        request, 'channel_list.html',
        {
            'host': host,
            'title': title,
            'sub': sub
        }
    )


def old_sub_category(request, sub):
    outer = get_object_or_404(Outer, inner__name=sub)
    return redirect('sub_category', title=outer.name, sub=sub)


def videos(request, title):
    return render(
        request, 'videos.html',
        {
            'title': title.replace('-', ' ')
        }
    )
