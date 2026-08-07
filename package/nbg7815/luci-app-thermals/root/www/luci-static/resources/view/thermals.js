'use strict';
'require view';
'require fs';
'require poll';

function getColor(tempC) {
	if (tempC < 75) return '#2ecc71';   // green
	if (tempC < 85) return '#f1c40f';   // yellow
	return '#e74c3c';                   // red
}

return view.extend({
	renderRows: function(table) {
		return fs.list('/sys/class/thermal/').then(function(entries) {
			var zones = entries.filter(function(e) {
				return e.name.indexOf('thermal_zone') === 0;
			});

			return Promise.all(zones.map(function(z) {
				var base = '/sys/class/thermal/' + z.name + '/';
				return Promise.all([
					fs.read(base + 'type').catch(function() { return 'unknown'; }),
					fs.read(base + 'temp').catch(function() { return '0'; })
				]).then(function(res) {
					var type = res[0].trim();
					var tempC = parseInt(res[1].trim(), 10) / 1000;
					var tempDisplay = tempC.toFixed(1) + ' °C';
					var pct = Math.max(0, Math.min(100, tempC));
					var color = getColor(tempC);

					var barOuter = E('div', {
						'style': 'position:relative; width:220px; height:20px; background:#eee; border-radius:4px; overflow:hidden;'
					}, [
						E('div', {
							'style': 'width:' + pct + '%; height:100%; background:' + color + '; transition: width 0.3s ease;'
						}),
						E('span', {
							'style': 'position:absolute; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; color:#000; text-shadow:0 0 3px #fff, 0 0 3px #fff;'
						}, tempDisplay)
					]);

					return E('tr', { 'class': 'tr' }, [
						E('td', { 'class': 'td' }, type),
						E('td', { 'class': 'td' }, [ barOuter ])
					]);
				});
			}));
		}).then(function(rows) {
			while (table.rows.length > 1)
				table.deleteRow(1);
			rows.forEach(function(r) { table.appendChild(r); });
		});
	},

	render: function() {
		var table = E('table', { 'class': 'table' }, [
			E('tr', { 'class': 'tr table-titles' }, [
				E('th', { 'class': 'th' }, _('Zone')),
				E('th', { 'class': 'th' }, _('Temperature'))
			])
		]);

		var self = this;
		poll.add(function() {
			return self.renderRows(table);
		}, 3);

		return E('div', { 'class': 'cbi-map' }, [
			E('h2', {}, _('Thermal Zones')),
			table
		]);
	}
});
