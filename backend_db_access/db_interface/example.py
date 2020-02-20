from db_interface import influx_client, influx_df_client


# ### example implementation ###

# ### delete file if not needed ###

def count():
    return list(influx_client.query('SELECT count("temperature") FROM "essen_temperatures"').get_points())[0]['count']


def get_temperatures(start=None, end=None):
    query = 'SELECT * FROM "essen_temperatures"'
    start_clause = 'time >= $start'
    end_clause = 'time < $end'
    if start is not None:
        query += ' WHERE ' + start_clause
        if end is not None:
            query += ' AND ' + end_clause
    else:
        if end is not None:
            query += ' WHERE ' + end_clause

    try:
        start = int(start)
        end = int(end)
    except ValueError:
        pass
    
    params = {'start': start, 'end': end}

    return influx_df_client.query(query, bind_params=params)['essen_temperatures']

# ### example implementation ###
