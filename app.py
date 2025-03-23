from flask import Flask, render_template, Response, request
import geopandas as gpd
import matplotlib.pyplot as plt
import io

app = Flask(__name__)

gdf = gpd.read_parquet("data/sismos.parquet")
mapamx = gpd.read_file("data/mapa_mexico/gdb_ref_esta_ine_2009.shp", encoding="latin1")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update_image', methods=['POST'])
def update_image():
    datos = request.get_json()
    magnitude_start = datos.get("magnitude_start")
    magnitude_end = datos.get("magnitude_end")
    depth_start = datos.get("depth_start")
    depth_end = datos.get("depth_end")


    gdf_partial = gdf[(gdf['Magnitud'].between(magnitude_start, magnitude_end)) & (gdf['Profundidad'].between(depth_start, depth_end))]

    fig, ax = plt.subplots(figsize=(8, 6))
    fig.patch.set_facecolor('lightgray')
    ax.set_facecolor('lightblue')
    mapamx.plot(ax=ax, color="green", edgecolor="black", alpha=0.5)
    gdf_partial.plot(ax=ax, color="red", markersize=20)

    img_io = io.BytesIO()
    fig.savefig(img_io, format='png', bbox_inches='tight')
    img_io.seek(0)

    plt.close(fig)
    return Response(img_io.getvalue(), mimetype='image/png')


if __name__ == '__main__':
    app.run(debug=True)
