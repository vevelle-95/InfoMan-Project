from flask import Flask, jsonify, request
from mysql.connector import connect, Error
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# ----------------------
# Database Configuration
# ----------------------
db_config = {
    'host': 'infomang11.ddns.net',
    'user': 'root',
    'password': 'Revolution_1986',
    'database': 'InvestmentAccountsDB'
}

# ----------------------
# Helper Functions
# ----------------------
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

# -------------------------------
# Generic CRUD Route Handler
# -------------------------------
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
            where_clause = ' AND '.join([f"{k} = %s" for k in identifier.keys()])
            query += f" WHERE {where_clause}"
            values = tuple(identifier.values())

        result, status = run_query(query, values, fetchall=True)
        return jsonify(result), status

    elif request.method == 'PUT' and identifier:
        data = request.json
        set_clause = ', '.join([f"{k} = %s" for k in data.keys()])
        where_clause = ' AND '.join([f"{k} = %s" for k in identifier.keys()])
        values = tuple(data.values()) + tuple(identifier.values())

        query = f"UPDATE {table} SET {set_clause} WHERE {where_clause}"
        result, status = run_query(query, values, commit=True)
        return jsonify(result), status

    elif request.method == 'DELETE' and identifier:
        where_clause = ' AND '.join([f"{k} = %s" for k in identifier.keys()])
        values = tuple(identifier.values())

        query = f"DELETE FROM {table} WHERE {where_clause}"
        result, status = run_query(query, values, commit=True)
        return jsonify(result), status

# -------------------------------
# Routes using Generic CRUD
# -------------------------------
@app.route('/accounts', methods=['POST', 'GET'])
def accounts():
    keys = ['Accnt_ID', 'AccntHolder_No', 'Accnt_Type', 'Accnt_Name', 'Accnt_ITF']
    return handle_crud('AccountInformation', keys)

@app.route('/accounts/<string:Accnt_ID>/<int:AccntHolder_No>', methods=['GET', 'PUT', 'DELETE'])
def single_account(Accnt_ID, AccntHolder_No):
    identifier = {'Accnt_ID': Accnt_ID, 'AccntHolder_No': AccntHolder_No}
    return handle_crud('AccountInformation', [], identifier)

# You can now easily add new modules:
@app.route('/principal-investors', methods=['POST', 'GET'])
def principal_investors():
    keys = [
        'Accnt_ID', 'Princip_Investor_ID', 'Princip_Investor_Name',
        'Princip_Investor_Birth_Date', 'Princip_Investor_Nationality'
    ]
    return handle_crud('PrincipalInvestors', keys)

@app.route('/peps', methods=['POST', 'GET'])
def peps():
    keys = ['PEP_ID', 'PEP_Name', 'Position', 'Country']
    return handle_crud('PEPInformation', keys)

@app.route('/peps/<string:PEP_ID>', methods=['GET', 'PUT', 'DELETE'])
def single_pep(PEP_ID):
    identifier = {'PEP_ID': PEP_ID}
    return handle_crud('PEPInformation', [], identifier)

@app.route('/tpbos', methods=['POST', 'GET'])
def tpbos():
    keys = ['TPBO_ID', 'TPBO_Name', 'Relationship']
    return handle_crud('TPBOInformation', keys)

@app.route('/tpbos/<string:TPBO_ID>', methods=['GET', 'PUT', 'DELETE'])
def single_tpbo(TPBO_ID):
    identifier = {'TPBO_ID': TPBO_ID}
    return handle_crud('TPBOInformation', [], identifier)

# -------------------------------
# Run the App
# -------------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
