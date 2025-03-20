from flask import Flask, render_template, Response
import geopandas as gpd
import matplotlib.pyplot as plt
import io

app = Flask(__name__)

gdf = gpd.read_parquet("data/sismos.parquet")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update_image', methods=['POST'])
def update_image():

    gdf_partial = gdf[(gdf['Magnitud'].between(1, 8)) & (gdf['Profundidad'].between(10, 100))]

    fig, ax = plt.subplots(figsize=(8, 6))
    fig.patch.set_facecolor('lightgray')
    ax.set_facecolor('lightblue')
    gdf_partial.plot(ax=ax, color="red", markersize=20)

    img_io = io.BytesIO()
    fig.savefig(img_io, format='png', bbox_inches='tight')
    img_io.seek(0)

    plt.close(fig)
    return Response(img_io.getvalue(), mimetype='image/png')


if __name__ == '__main__':
    app.run(debug=True)
