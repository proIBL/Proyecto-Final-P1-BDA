from flask import Flask, render_template, Response, request
import geopandas as gpd
import matplotlib.pyplot as plt
import io

app = Flask(__name__)


earthquakes = gpd.read_parquet("data/sismos.parquet")
mapamx = gpd.read_file("data/mapa_mexico/gdb_ref_esta_ine_2009.shp", encoding="latin1")
edaphology = gpd.read_parquet("data/edafología.parquet")
edaphology['Text_campo'] = edaphology['Text_campo'].replace({'Areno - francosa': 'Areno - Francosa'})
edaphology['Clase_text'] = edaphology['Clase_text'].replace({'Areno - francosa': 'Areno - Francosa'})


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/update_image', methods=['POST'])
def update_image():
    fig, ax = plt.subplots(figsize=(8, 6))
    fig.patch.set_facecolor('lightgray')
    ax.set_facecolor('lightblue')
    mapamx.plot(ax=ax, color="green", edgecolor="black", alpha=0.5)

    filters  = request.get_json()
    filters_earthquakes = {k: v for k, v in filters.items() if k in {"Magnitud", "Profundidad"} and v is not False}
    filters_edaphology = {k: v for k, v in filters.items() if v is not False and k !="Magnitud" and k != "Profundidad"}

    if len(filters_earthquakes) != 0:
        earthquakes_partial = earthquakes
        for k, v in filters_earthquakes.items():
            min_val, max_val = v
            earthquakes_partial = earthquakes_partial.query(f"{min_val} < {k} < {max_val}")
        if not earthquakes_partial.empty:
            earthquakes_partial.plot(ax=ax, color="red", markersize=10)

    if len(filters_edaphology) != 0:
        edaphology_partial = edaphology
        for k, v in filters_edaphology.items():
            if isinstance(v, list):  # Rango
                min_val, max_val = v
                edaphology_partial = edaphology_partial.query(f"{min_val} < {k} < {max_val}")
            else:
                edaphology_partial = edaphology_partial.query(f"{k} == @v")

        if not edaphology_partial.empty:
            edaphology_partial.plot(ax=ax, color="yellow", markersize=10)

    img_io = io.BytesIO()
    fig.savefig(img_io, format='png', bbox_inches='tight')
    img_io.seek(0)

    plt.close(fig)
    return Response(img_io.getvalue(), mimetype='image/png')


if __name__ == '__main__':
    app.run(debug=True)
