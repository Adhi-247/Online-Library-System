import requests
import csv
import time

API_KEY = 'AIzaSyB6XHO8OyEVfQpPgvZ3zv5_3SzqwU5cqB8'
QUERY = 'subject:fiction'
MAX_RESULTS = 40
TOTAL_BOOKS = 150

books = []
isbns = set()
start_index = 0

while len(books) < TOTAL_BOOKS:
    url = f'https://www.googleapis.com/books/v1/volumes?q={QUERY}&startIndex={start_index}&maxResults={MAX_RESULTS}&key={API_KEY}'
    print(f'Fetching books {start_index+1} to {start_index+MAX_RESULTS}...')
    try:
        resp = requests.get(url, timeout=10)
        data = resp.json()
        items = data.get('items', [])
        if not items:
            print('No more items returned by API. Stopping.')
            break
        for item in items:
            info = item['volumeInfo']
            isbn = next((id['identifier'] for id in info.get('industryIdentifiers', []) if id['type'] == 'ISBN_13'), '')
            if isbn and isbn in isbns:
                continue  # skip duplicates
            isbns.add(isbn)
            books.append({
                'title': info.get('title', ''),
                'author': ', '.join(info.get('authors', [])),
                'isbn': isbn,
                'description': info.get('description', ''),
                'coverImage': info.get('imageLinks', {}).get('thumbnail', ''),
                'publishDate': info.get('publishedDate', ''),
                'pages': info.get('pageCount', 0),
                'available': 5,  # Default value, change if needed
                'categoryId': 1,  # Default value, change if needed
                'publisher': info.get('publisher', 'Unknown'),
                'totalCopies': 5  # Default value, change if needed
            })
            print(f'Fetched {len(books)} books so far...')
            if len(books) >= TOTAL_BOOKS:
                break
        start_index += MAX_RESULTS
        time.sleep(1)
    except Exception as e:
        print(f'Error fetching books: {e}')
        break

if books:
    # Ensure the order of columns matches the database table
    fieldnames = [
        'title', 'author', 'isbn', 'description', 'coverImage', 'publishDate', 'pages',
        'available', 'categoryId', 'publisher', 'totalCopies'
    ]
    with open('books.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(books)
    print(f'Saved {len(books)} books to books.csv')
else:
    print('No books fetched. Please check your API key or internet connection.')