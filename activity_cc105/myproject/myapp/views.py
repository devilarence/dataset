from django.shortcuts import render
import csv

def job_listings(request):
    jobs = []
    with open(r'c:\Users\loure\Downloads\archive (2)\jobss.csv', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            jobs.append({
                'title': row['Job Title'],
                'experience': row['Job Experience Required'],
                'skills': row['Key Skills'],
                'location': row['Location'],
                'salary': row['sal']
            })
    return render(request, 'job_listing.html', {'jobs': jobs})
