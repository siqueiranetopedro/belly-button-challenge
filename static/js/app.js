const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);


// d3.json(url).then(function(data) {
//   console.log(data);
// });

// Demo info
function buildPanel(x) {
  d3.json(url).then(function (data) {
    let metadata = data.metadata;
    let selectedMetadata = metadata.find(item => item.id == x);
    d3.select("#sample-metadata").html("");

    Object.entries(selectedMetadata).forEach(([key, value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
}


// bar chart
function buildCharts(x) {
  d3.json(url).then(function (data) {
    let samples = data.samples;
    console.log(samples);

    let results = samples.find(item => item.id == x);

    let otu_ids = results.otu_ids;
    let otu_labels = results.otu_labels;
    let sample_values = results.sample_values;
    console.log(otu_ids, otu_labels, sample_values);

    let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    let xticks = sample_values.slice(0, 10).reverse();
    let labels = otu_labels.slice(0, 10).reverse();

    let trace = {
      x: xticks,
      y: yticks,
      text: labels,
      type: "bar",
      orientation: "h",
    };
    let layout = {
      title: "Top 10 OTUs Present",
    };
    Plotly.newPlot("bar", [trace], layout);

  }); 
}
// bubble chart
function buildBubbleChart(x) {
  d3.json(url).then(function (data) {
    let samples = data.samples;
    console.log(samples);
    let results = samples.find(item => item.id == x);
   
    let otu_ids = results.otu_ids; 
    let sample_values = results.sample_values;
    let otu_labels = results.otu_labels;

   
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth",
      },
    };

    // Set up the layout
    let layout = {
      title: "Bacteria Per Sample",
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
    };

    // Call Plotly to plot the bubble chart
    Plotly.newPlot("bubble", [trace1], layout);
  });
}




function init() {
  let dropdown = d3.select('#selDataset');
  d3.json(url).then(function (data) {
    //console.log(data);
    let names = data.names;
    console.log(names);
    for (let index = 0; index < names.length; index++) {
      dropdown.append('option').text(names[index]).property('value', names[index]);
    }

    buildPanel(names[0]);
    buildCharts(names[0]);
    buildBubbleChart(names[0]);
  });
}
function optionChanged(x) {
  buildPanel(x);
  buildCharts(x);
  buildBubbleChart(x);
}
init();