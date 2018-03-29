# SCARY

## Team: Scary
## Members: Jenny Gao, Kristin Lin, Levi Olevsky, Sonal Parab
## Period: 8

### Description of data set(s).
The dataset focuses on crime rates in U.S. cities from FBI statistics in 2015. The cities included must have a population of at least 100,000. The violent crimes section, which we have chosen to work with, is separated further into murder and nonnegligent manslaughter, rape, robbery, and aggravated assault. The numbers listed for each category represent the number of crimes reported in that year for that category. 

### Source (brief description + hyperlink)
This dataset from the FBI website includes a list of cities in the United States and different categories of crime prevelant in each city such as murder, rape, robbery, aggravated assault, etc. https://ucr.fbi.gov/crime-in-the-u.s/2017/preliminary-report/tables/table-4/state-cuts/oklahoma-through-wisconsin.xls

### Relevance/significance
Many people consider safety when choosing a neighborhood to live in. This data visualization project would allow people to gauge safety through the display of crime rate information. It’s also a fascinating topic, and people may be surprised after seeing this (things they did not know about).

### Explanation, in broad strokes if necessary, of how you aim to make this data come alive.
A map of the U.S. will be shown with all state borders. The color of the states will be more opaque or transparent based on the crime rate for the types of crimes selected (e.g. murder, rape, robbery).

### What will be shown, absent user interaction?
The default map will have the colors of the states based on the total crime rate of each state.

### How will user interact with your visualization?
Users first select the type of crime info they want displayed (violent crimes like murder, property crime like motor vehicle theft, or arson). If multiple crime types are selected, there will be layering of color. Users can hover over states and get info about crime rate in that state (for crime types selected). A bar will rise up from the state, and show the percentage of crimes.

### What questions will your visualization allow user to explore? What questions will it provoke?
The user can find out which states have the lowest/highest crime rates in the country. They can also filter by specific crimes, allowing them to analyze the rates of any type of crime that interests them.

### Explanation of D3 feature utilization.
States will be colored based on the data collected and will have different color layers for the categories of crime. Transition effects will be used when selecting to show certain data and not show other data. Bar graphs will rise when the mouse is hovering over a state.

### Sketch/mock-up/screenshot of your envisioned visualization.


When no interactions (would show crime rate instead of unemployment rate):


When hovering (except with types of crime and not all at once):

