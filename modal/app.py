class x_ticket_info(BaseModel):
    id: str


@app.post("/x_ticketid_info")
def x_ticketid_info(request: x_ticket_info):
    myquery = f"""
        SELECT *
        FROM ops_knowledge.x_ticket_ontop_info
        WHERE  id = '{request.id}'
        """
    # global resultx
    return db_ops_knowledge(myquery)  # type: ignore


class x_ticket(BaseModel):
    id: str
    summary: str
    comment: str
    status: str
    email_cat: str
    target_date: str
    enabled: str


@app.post("/x_ticket_update_info")
def x_ticket_update_info(request: x_ticket):

    changeStatus = "" if request.status == "" else f"status = {request.status},"
    email_Status = "" if request.email_cat == "" else f"email_cat = {request.email_cat},"
    targetStatus = "" if request.target_date == "" else f"target_date = '{request.target_date}',"

    query_UPDATE = f"""
        UPDATE ops_knowledge.x_ticket_ontop_info
        SET
            summary = '{request.summary}',
            enabled = '{request.enabled}',
            {changeStatus}
            {email_Status}
            {targetStatus}
            comment = '{request.comment}'
        WHERE
            id = '{request.id}';
        """
    print(query_UPDATE)
    # global resultx
    connection = db_maria_opsknowledge.connect_to_database()
    if connection:
        try:
            with connection.cursor() as cursor:
                cursor.execute(query_UPDATE)
                connection.commit()
                affected_rows = cursor.rowcount  # Number of affected rows
                return {"success": True, "affected_rows": affected_rows}
        except pymysql.Error as e:
            return (f"Error executing query: {e}")

    # return db_ops_knowledge(query_UPDATE)  # type: ignore


@app.post("/x_ticket_add")
def x_ticket_add(request: x_ticket):

    changeStatus = 'NULL' if request.status == "" else request.status
    email_Status = 'NULL' if request.email_cat == "" else request.email_cat
    targetStatus = 'NULL' if request.target_date == "" else {
        request.target_date}

    query_ADD = f"""
        INSERT INTO ops_knowledge.x_ticket_ontop_info 
        (id, summary, comment, status, email_cat, target_date,enabled)
        
        VALUES 
        ('{request.id}', '{request.summary}', '{request.comment}', {changeStatus}, {email_Status}, {targetStatus}, {request.enabled});
    
        """
    print(query_ADD)
    # global resultx
    connection = db_maria_opsknowledge.connect_to_database()
    if connection:
        try:
            with connection.cursor() as cursor:
                cursor.execute(query_ADD)
                connection.commit()
                affected_rows = cursor.rowcount  # Number of affected rows
                return {"success": True, "affected_rows": affected_rows}
        except pymysql.Error as e:
            return (f"Error executing query: {e}")

    # return db_ops_knowledge(query_UPDATE)  # type: ignore


@app.get("/x_tickets_all_active")
def x_tickets_all_active():
    myquery = f"""
        SELECT 
info.id
,info.summary
,info.comment
,info.status
,info.email_cat
,info.target_date
,info.enabled
,xemail.name as 'email_cat_name'
,xstatus.name as 'status_name'

FROM ops_knowledge.x_ticket_ontop_info info
LEFT JOIN ops_knowledge.x_ticket_ontop_email_cats xemail on xemail.id  = info.email_cat
LEFT JOIN ops_knowledge.x_ticket_ontop_status xstatus on  xstatus.id  = info.status
   
WHERE  enabled = 1

                """
    # global resultx
    return db_ops_knowledge(myquery)  # type: ignore

