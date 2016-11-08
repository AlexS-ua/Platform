(function (Q, $) {

/**
 * @module Streams-tools
 */

/**
 * Lets the user search for streams by type and title, and choose them
 * @class Streams lookup
 * @constructor
 * @param {Array} [options] Override various options for this tool
 * @param {String} [publisherId=Q.Users.communityId] id of the user publishing the streams
 * @param {Array} types the types of streams the user can select
 * @param {Object} [typeNames] pairs of {type: typeName} to override names of the types, which would otherwise be taken from the types
 * @param {Boolean} [multiple=false] whether the user can select multiple types
 * @param {Object} [filter] any options for the Q/filter tool
 */
Q.Tool.define("Streams/lookup", function _Streams_lookup_tool (options) {
	var state = this.state;
	if (Q.isEmpty(state.types)) {
		throw new Q.Error("Streams/lookup tool: missing types");
	}
	this.refresh();
}, {
	publisherId: Q.info.app,
	communityId: Q.Users.communityId,
	types: [],
	typeNames: {},
	multiple: false,
	filter: {
		placeholder: "Start typing..."
	},
	onRefresh: new Q.Event()
}, {
	/**
	 * Call this method to refresh the contents of the tool, requesting only
	 * what's needed and redrawing only what's needed.
	 * @method refresh
	 * @param {Function} An optional callback to call after refresh has completed.
	 *  It receives (result, entering, exiting, updating) arguments.
	 */
	refresh: function (callback) {
		var tool = this;
		var state = tool.state;
		var publisherId = state.publisherId;
		var streamName = state.streamName;
		for (var i=0; i<state.types.length; ++i) {
			var type = state.types[i];
			if (!state.typeNames[type]) {
				state.typeNames[type] = state.types[i].split('/').pop().toCapitalized();
			}
		}
		fields = Q.extend({
			multiple: state.multiple
		}, state);
		Q.Template.render('Streams/lookup/tool', fields, function (err, html) {
			var msg;
			if (msg = Q.firstErrorMessage(err)) {
				return alert(msg);
			}
			tool.element.innerHTML = html;
			tool.$select = tool.$('select');
			Q.activate(tool.element, {
				'.Q_filter_tool': state.filter
			}, function () {
				var filter = tool.child('Q_filter');
				filter.state.onFilter.set(function (query, element) {
					var latest = Q.latest(filter);
					getResults(query, tool.$select.val(), state.publisherId,
					function ($content) {
						if (Q.latest(filter, latest)) {
							$(element).empty().append($content);
						}
					});
				}, tool);
				tool.$select.on('change', function () {
					Q.handle(filter.state.onFilter, filter, ['', filter.$results[0]]);
				});
			});
			Q.handle(callback, tool);
		});
	},
	Q: {
		beforeRemove: function () {

		}
	}
});

var getResults = Q.getter(function (filter, types, publisherId, callback) {
	Q.req('Streams/lookup', 'results', function (err, data) {
		var results, msg;
		if (msg = Q.firstErrorMessage(err, data && data.errors)) {
			results = $('<div class="Streams_noResults"/>')
				.html("No results");
			callback(results);
			return;
		}
		var $table = $('<table />');
		Q.each(data.slots.results, function (i, result) {
			var $tr = $('<tr class="Streams_lookup_result" />')
			.appendTo($table);
			var $td = $('<td class="Streams_lookup_result_icon" />')
			.append($('<img />', {'src': result.icon+'/80.png'}))
			.appendTo($tr);
			var $td = $('<td class="Streams_lookup_result_title" />')
			.text(result.title)
			.appendTo($tr);
		});
		callback($table);
	}, { fields: { 
		publisherId: publisherId,
		filter: filter,
		types: types
	}})
});

Q.Template.set('Streams/lookup/tool',
	'<select name="streamType" {{#if multiple}}multiple="multiple"{{/if}}>\n'
	+ '{{#each types}}\n'
	+ '<option value="{{this}}">{{lookup ../typeNames this}}</option>\n'
	+ '{{/each}}\n'
	+ '</select>\n'
	+ '{{&tool "Q/filter" ""}}'
);

})(Q, jQuery);