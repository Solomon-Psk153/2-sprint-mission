# 아래는 chatgpt가 코드를 짰는데 너무 엉망이여서 나중에 갈아엎어야 할 듯 싶다.

from datetime import datetime, timedelta
import random
import faker
import sys
import os

fake = faker.Faker()

# Constants
NUM_CLIENTS = 40
NUM_ARTICLES = 200
NUM_COMMENTS = 250
NUM_ARTICLE_LIKES = 200
NUM_PRODUCTS = 150
NUM_PRODUCT_LIKES = 200
NUM_PRODUCT_COMMENTS = 300
NUM_TAGS = 40
NUM_PRODUCT_TAGS = 300

# # Helper to generate timestamps
# def random_timestamp():
#     return fake.date_time_between(start_date='-1y', end_date='now').strftime('%Y-%m-%d %H:%M:%S')

# 1. Clients
clients = []
for i in range(1, NUM_CLIENTS + 1):
    email = fake.email()
    provider = random.choice(["google", "kakao", "naver", "discord", "local"])
    provider_id = i
    nickname = fake.user_name()
    password = random.randint(1,9999) if provider == "local" else None
    t = f"('{email}', '{provider}', {provider_id}, '{nickname}', "
    
    if password: t += f"'{password}'"
    else: t += f"NULL"
    t += ')'
    clients.append(t)
        

# 2. Articles
articles = []
client_ids_for_articles = list(range(1, 6))  # clients 1~5
for i in range(1, NUM_ARTICLES + 1):
    title = fake.sentence(nb_words=6).replace("'", "''")[:9]
    content = fake.paragraph(nb_sentences=3).replace("'", "''")
    client_id = client_ids_for_articles[(i - 1) % 5]
    articles.append(f"('{title}', '{content}', {client_id})")

# 3. Article Comments
article_comments = []
article_ids_for_comments = list(range(1, 6))  # articles 1~5
for i in range(NUM_COMMENTS):
    content = fake.sentence().replace("'", "''")
    article_id = random.choice(article_ids_for_comments)
    client_id = (i % NUM_CLIENTS) + 1
    t = f"('{content}', {article_id}, {client_id})"
    if t not in article_comments:
        article_comments.append(t)
    

# 4. Article Likes
article_likes = []
# while article_likes.length < NUM_ARTICLE_LIKES:
for i in range(NUM_ARTICLE_LIKES):
    article_id = i // NUM_CLIENTS + 1 #random.choice(article_ids_for_comments)
    client_id = (i % NUM_CLIENTS) + 1
    article_likes.append(f"({client_id}, {article_id})")

# 5. Products
products = []
for i in range(1, NUM_PRODUCTS + 1):
    name = fake.word().capitalize()[:9]
    description = fake.text(max_nb_chars=50).replace("'", "''")
    price = round(random.uniform(10, 1000), 2)
    client_id = client_ids_for_articles[(i - 1) % 5]
    products.append(f"('{name}', '{description}', {price}, {client_id})")

# 6. Product Likes
product_likes = []
product_ids_for_likes = list(range(1, 6))
for i in range(NUM_PRODUCT_LIKES):
    client_id = (i % NUM_CLIENTS) + 1
    product_id = i // NUM_CLIENTS + 1 #random.choice(product_ids_for_likes)
    product_likes.append(f"({client_id}, {product_id})")

# 7. Product Comments
product_comments = []
for i in range(NUM_PRODUCT_COMMENTS):
    content = fake.sentence().replace("'", "''")
    product_id = random.choice(product_ids_for_likes)
    client_id = (i % NUM_CLIENTS) + 1
    product_comments.append(f"('{content}', {product_id}, {client_id})")

# 8. Tags
tags = []
for i in range(1, NUM_TAGS + 1):
    tag = "{:04d}".format(i)
    tags.append(f"('{tag}')")

# 9. Product Tags
product_tags = []
for i in range(NUM_PRODUCT_TAGS):
    tag_id = (i % NUM_TAGS) + 1
    product_id = ((i % NUM_PRODUCTS) + 1)
    product_tags.append(f"({tag_id}, {product_id})")
# 숫자가 달라지면, 언제든지 충돌이 발생할 수 있으므로 고쳐야 한다.

# Collect all inserts
rv = """begin;

alter sequence article_comment_id_seq restart with 1;
alter sequence article_id_seq restart with 1;
alter sequence article_like_id_seq restart with 1;
alter sequence client_id_seq restart with 1;
alter sequence image_id_seq restart with 1;
alter sequence product_comment_id_seq restart with 1;
alter sequence product_id_seq restart with 1;
alter sequence product_like_id_seq restart with 1;
alter sequence product_tag_id_seq restart with 1;
alter sequence tag_id_seq restart with 1;
\n
"""

rv += """
insert into client
	(email, provider, provider_id, nickname, password)
values
""" + ',\n'.join(clients)
rv += ';\n'

rv += """
insert into article
	(title, content, client_id)
values
""" + ',\n'.join(articles)
rv += ';\n'

rv += """
insert into article_comment
	(content, article_id, client_id)
values
""" + ',\n'.join(article_comments)
rv += ';\n'

rv += """
insert into article_like
	(client_id, article_id)
values
""" + ',\n'.join(article_likes)
rv += ';\n'

rv += """
insert into product
	(name, description, price, client_id)
values
""" + ',\n'.join(products)
rv += ';\n'

rv += """
insert into product_like
	(client_id, product_id)
values
""" + ',\n'.join(product_likes)
rv += ';\n'

rv += """
insert into product_comment
	(content, product_id, client_id)
values
""" + ',\n'.join(product_comments)
rv += ';\n'

rv += """
insert into tag
	(name)
values
""" + ',\n'.join(tags)
rv += ';\n'

rv += """
insert into product_tag
	(tag_id, product_id)
values
""" + ',\n'.join(product_tags)
rv += ';\n\ncommit;\n'

try:
    with open(os.path.abspath('sql/insert.sql'), 'w') as f:
        f.write(rv)
    print('write complete to insert.sql')
    print(os.getcwd())
except Exception as e:
    print(e, file=sys.stderr)

