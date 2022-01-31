from django.shortcuts import render


def section(request):
    return render(request, 'ec_admin/section.html', {'active_nav': 'add_section'})

def product_type(request):
    return render(request, 'ec_admin/product_type.html', {'active_nav': 'add_type'})
