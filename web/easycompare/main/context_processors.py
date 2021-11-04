def base_context(request):
    header_links = {
        'Главная': 'http://127.0.0.1:8000',
        'Сравнение техники': '1',
        'Подбор техники': 'section',
    }
    context = {
        'logo': 'EC',
        'title': 'EasyCompare',
        'header_links': header_links.items(),
    }

    return context