from flask import Flask, jsonify, request
from mysql.connector import connect, Error
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# Database Configuration
db_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'ivelle95',
    'database': 'investmentaccountsdb',
}

def get_db_connection():
    try:
        return connect(**db_config)
    except Error as e:
        app.logger.error(f"Database connection error: {e}")
        return None

def run_query(query, values=None, fetchone=False, fetchall=False, commit=False):
    conn = get_db_connection()
    if not conn:
        return {'error': 'Database connection failed'}, 500

    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(query, values)

        result = None
        if fetchone:
            result = cursor.fetchone()
        elif fetchall:
            result = cursor.fetchall()

        if commit:
            conn.commit()

        return result or {'message': 'Operation successful'}, 200

    except Error as e:
        conn.rollback()
        return {'error': str(e)}, 400

    finally:
        cursor.close()
        conn.close()

def validate_date(date_str):
    try:
        datetime.datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False

# Generic CRUD Handler
def handle_crud(table, keys, identifier=None):
    if request.method == 'POST':
        data = request.json
        if not all(field in data for field in keys):
            return jsonify({'error': 'Missing required fields'}), 400

        fields = ', '.join(keys)
        placeholders = ', '.join(['%s'] * len(keys))
        values = tuple(data[key] for key in keys)

        query = f"INSERT INTO {table} ({fields}) VALUES ({placeholders})"
        result, status = run_query(query, values, commit=True)
        return jsonify(result), status

    elif request.method == 'GET':
        query = f"SELECT * FROM {table}"
        values = ()
        if identifier:
            where_clause = ' AND '.join([f"{k} = %s" for k in identifier])
            query += f" WHERE {where_clause}"
            values = tuple(identifier.values())

        result, status = run_query(query, values, fetchall=True)
        return jsonify(result), status

    elif request.method == 'PUT' and identifier:
        data = request.json
        set_clause = ', '.join([f"{k} = %s" for k in data])
        where_clause = ' AND '.join([f"{k} = %s" for k in identifier])
        values = tuple(data.values()) + tuple(identifier.values())

        query = f"UPDATE {table} SET {set_clause} WHERE {where_clause}"
        result, status = run_query(query, values, commit=True)
        return jsonify(result), status

    elif request.method == 'DELETE' and identifier:
        where_clause = ' AND '.join([f"{k} = %s" for k in identifier])
        values = tuple(identifier.values())

        query = f"DELETE FROM {table} WHERE {where_clause}"
        result, status = run_query(query, values, commit=True)
        return jsonify(result), status

# Route Definitions
@app.route('/accounts', methods=['POST', 'GET'])
def accounts():
    keys = ['Accnt_ID', 'AccntHolder_No', 'Accnt_Type', 'Accnt_Name', 'Accnt_ITF']
    return handle_crud('AccountInformation', keys)

@app.route('/accounts/<string:Accnt_ID>/<int:AccntHolder_No>', methods=['GET', 'PUT', 'DELETE'])
def single_account(Accnt_ID, AccntHolder_No):
    identifier = {'Accnt_ID': Accnt_ID, 'AccntHolder_No': AccntHolder_No}
    return handle_crud('AccountInformation', [], identifier)

@app.route('/principal-investors', methods=['POST', 'GET'])
def principal_investors():
    keys = [
        'Accnt_ID', 'Princip_Investor_ID', 'Princip_Investor_Name',
        'Princip_Investor_Birth_Date', 'Princip_Investor_Nationality',
        'Princip_Investor_Perma_Add', 'Princip_Investor_Present_Add',
        'Princip_Investor_HomeNo', 'Princip_Investor_Sex',
        'Princip_Investor_Civil_Status', 'Princip_Investor_Birth_Place',
        'Princip_Investor_Email_Add', 'SSS_No', 'Princip_Investor_WorkNo',
        'Princip_Investor_Occupation', 'Nature_Work', 'Job_Description',
        'Company_Name', 'Gross_Annual_Income', 'Princip_Investor_Work_Address',
        'Princip_Investor_Mailing_Address', 'PH_TIN'
    ]
    return handle_crud('PrincipalInvestorInformation', keys)

@app.route('/peps', methods=['POST', 'GET'])
def peps():
    keys = ['PEP_ID', 'PEP_Name', 'PEP_Relationship', 'PEP_GovtPosition']
    return handle_crud('PEPInformation', keys)

@app.route('/peps/<string:PEP_ID>', methods=['GET', 'PUT', 'DELETE'])
def single_pep(PEP_ID):
    identifier = {'PEP_ID': PEP_ID}
    return handle_crud('PEPInformation', [], identifier)

@app.route('/tpbos', methods=['POST', 'GET'])
def tpbos():
    keys = [
        'Accnt_ID', 'TPBO_ID', 'TPBO_Type', 'TPBO_Name', 'TPBO_Relationship',
        'TPBO_Residence', 'TPBO_Birth_Date', 'TPBO_Birth_Place', 'TPBO_Sex',
        'TPBO_TIN', 'TPBO_Nationality', 'TPBO_Occupation', 'TPBO_Number'
    ]
    return handle_crud('TPBOInformation', keys)

@app.route('/tpbos/<string:TPBO_ID>', methods=['GET', 'PUT', 'DELETE'])
def single_tpbo(TPBO_ID):
    identifier = {'TPBO_ID': TPBO_ID}
    return handle_crud('TPBOInformation', [], identifier)

# Search Routes
@app.route('/accounts/search', methods=['GET'])
def search_accounts():
    query = request.args.get('q', '')
    if not query:
        return jsonify({'error': 'Search query missing'}), 400

    sql = """
        SELECT * FROM AccountInformation
        WHERE Accnt_Name LIKE %s OR Accnt_ID LIKE %s
    """
    values = (f'%{query}%', f'%{query}%')
    result, status = run_query(sql, values, fetchall=True)
    return jsonify(result), status

@app.route('/principal-investors/search', methods=['GET'])
def search_principal_investors():
    query = request.args.get('q', '')
    if not query:
        return jsonify({'error': 'Search query missing'}), 400

    sql = """
        SELECT * FROM PrincipalInvestorInformation
        WHERE Princip_Investor_Name LIKE %s OR Accnt_ID LIKE %s
    """
    values = (f'%{query}%', f'%{query}%')
    result, status = run_query(sql, values, fetchall=True)
    return jsonify(result), status

@app.route('/peps/search', methods=['GET'])
def search_peps():
    query = request.args.get('q', '')
    if not query:
        return jsonify({'error': 'Search query missing'}), 400

    sql = """
        SELECT * FROM PEPInformation
        WHERE PEP_Name LIKE %s OR PEP_ID LIKE %s
    """
    values = (f'%{query}%', f'%{query}%')
    result, status = run_query(sql, values, fetchall=True)
    return jsonify(result), status

@app.route('/tpbos/search', methods=['GET'])
def search_tpbos():
    query = request.args.get('q', '')
    if not query:
        return jsonify({'error': 'Search query missing'}), 400

    sql = """
        SELECT DISTINCT TPBOInformation.*
        FROM TPBOInformation
        JOIN AccountInformation ON TPBOInformation.Accnt_ID = AccountInformation.Accnt_ID
        WHERE LOWER(AccountInformation.Accnt_ID) LIKE LOWER(%s)
           OR LOWER(TPBO_Name) LIKE LOWER(%s)
           OR LOWER(TPBO_ID) LIKE LOWER(%s)
           OR LOWER(TPBO_Type) LIKE LOWER(%s)
           OR LOWER(TPBO_Relationship) LIKE LOWER(%s)
           OR LOWER(TPBO_Residence) LIKE LOWER(%s)
           OR LOWER(TPBO_Birth_Date) LIKE LOWER(%s)
           OR LOWER(TPBO_Birth_Place) LIKE LOWER(%s)
           OR LOWER(TPBO_Sex) LIKE LOWER(%s)
           OR LOWER(TPBO_TIN) LIKE LOWER(%s)
           OR LOWER(TPBO_Nationality) LIKE LOWER(%s)
           OR LOWER(TPBO_Occupation) LIKE LOWER(%s)
           OR LOWER(TPBO_Number) LIKE LOWER(%s)
    """
    values = tuple([f'%{query}%'] * 13)
    result, status = run_query(sql, values, fetchall=True)
    return jsonify(result), status

@app.route('/accounts/cascade/<accnt_id>/<int:accnt_holder_no>', methods=['DELETE'])
def delete_account_cascade(accnt_id, accnt_holder_no):
    try:
        with connect(**db_config) as conn:
            with conn.cursor() as cursor:
                # Adjust table names accordingly
                cursor.execute("DELETE FROM PrincipalInvestorInformation WHERE Accnt_ID = %s", (accnt_id,))
                cursor.execute("DELETE FROM TPBOInformation WHERE Accnt_ID = %s", (accnt_id,))
                cursor.execute("DELETE FROM PEPInformation WHERE Accnt_ID = %s", (accnt_id,))
                cursor.execute("DELETE FROM AccountInformation WHERE Accnt_ID = %s AND AccntHolder_No = %s", (accnt_id, accnt_holder_no))
                conn.commit()
        return jsonify({'message': 'Cascade delete successful'}), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500

# Run the App
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
