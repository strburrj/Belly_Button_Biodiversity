//Code Start

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  } 
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var results = metadata.filter(x => x.id == sample);
    var result = results[0];
    var sample_data = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sample_data.html("");

    //Refreshing the data in the Demographic info
    Object.entries(result).forEach(function([key, value]) {
        sample_data.append("h6").text(`${key}:${value}`)
    });
    });
};
function buildCharts(sample) {
    
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var results = samples.filter(x => x.id == sample);
        var result = results[0];

      // Bubble Chart D3
      let otu_ids  = result.otu_ids;
      let otu_labels = result.otu_labels;
      let sample_values = result.sample_values;
  
      let bubble_chart = {
  
        mode: "markers",
        x: otu_ids,
        y: sample_values,
        text: otu_labels, 
        marker: {color:otu_ids, colorscale:"Rainbow", size:sample_values}
      };
  
      let bubble_data = [bubble_chart];
  
      let bubble_layout = {
  
        title : "Bacteria Type and Counts",
        showlegend: false,
        height: 600,
        width: 1000
  
      };

      Plotly.newPlot("bubble", bubble_data, bubble_layout);
    } );
}

function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
  }
init ()