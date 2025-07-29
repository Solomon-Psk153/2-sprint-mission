create or replace function update_timestamp()
    returns trigger as $$
        begin
            new.updated_at = now();
            return new;
        end; 
    $$ language plpgsql;
--
create trigger update_article_comment_timestamp
    before update on article_comment
    for each row
    execute function update_timestamp();
--
create trigger update_article_timestamp
    before update on article
    for each row
    execute function update_timestamp();
--
create trigger update_client_timestamp
    before update on client
    for each row
    execute function update_timestamp();
--
create trigger update_product_comment_timestamp
    before update on product_comment
    for each row
    execute function update_timestamp();
--
create trigger update_product_timestamp
    before update on product
    for each row
    execute function update_timestamp();