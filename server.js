config = require('./config/config');

var dashboard = require('./lib/dashboard');
var tracker = require('./lib/tracker');
var demo = require('./lib/demo');


// Setup dashboard port listener
var dashboard_port = config.dashboard_port;
var dashboard_address = (config.dashboard_address || "*");

dashboard.listen(dashboard_port, dashboard_address);
console.log("Dashboard listening on http://" + dashboard_address + ":" + dashboard_port + ".");


// Setup tracker port listener...
var tracking_port, tracking_address;

if (typeof config.tracking_port != 'number') {
    // Tracker should listen on the same port as the dashboard
    tracker.listen(dashboard_port, dashboard_address);

} else {
    // Tracker should listen on specified port
    tracking_port = config.tracking_port;
    tracking_address = (config.tracking_address || "0.0.0.0");

    tracker.listen(tracking_port, tracking_address);
    tracker.listenUdp(tracking_port, tracking_address);
}

console.log("Tracker listening on http://" + tracking_address + ":" + tracking_port + "/tracking_pixel.gif.");


// Run in demo mode?
if (config.demo_mode) {
  demo.run(tracker);
}
