var Configuration = {
    projecten: [],
    articles: [],
    presets: [],
    projectColumn: '.js--project',
    articleColumn: '.js--article',
    presetColumn: '.js--preset',
    projectDropdowns: ".js--projectselect",
    articleDropdowns: ".js--articleselect",

    Init: function() {
        var self = this;
        $('.configuration .button, .configuration a, .configuration button').button();
        $('.configuration input:text, .configuration input:password')
            .button()
            .css({
                'font': 'inherit',
                'color': 'inherit',
                'text-align': 'left',
                'outline': 'none',
                'cursor': 'text',
                'background': 'white'
            });
        $('.js--create').button('option', 'icons', {
            primary: 'ui-icon-arrowthickstop-1-s'
        });
        self.DeserializeConfiguration();
        self.InitColumns();
        self.UpdateTables();
    },
    SerializeConfiguration: function() {
        var self = this;
        localStorage['projecten'] = JSON.stringify(self.projecten);
        localStorage['articles'] = JSON.stringify(self.articles);
        localStorage['presets'] = JSON.stringify(self.presets);
    },
    DeserializeConfiguration: function() {
        var self = this;
        self.projecten = self.DeserializeVariable('projecten');
        self.articles = self.DeserializeVariable('articles');
        self.presets = self.DeserializeVariable('presets');
    },

    DeserializeVariable: function(Storagename, Array) {
        if (typeof(localStorage[Storagename]) !== 'undefined' && IsJsonString(localStorage[Storagename])) {
            var JSONDestringed = JSON.parse(localStorage[Storagename]);
            if (typeof(JSONDestringed) === 'object') {
                return JSONDestringed;
            }
        }
        return [];
    },
    InitColumns: function() {
        var self = this;
        self.InitColumn($(self.projectColumn), self.projecten);
        self.InitColumn($(self.articleColumn), self.articles);
        self.InitPresetColumn();
    },
    InitColumn: function($column, array) {
        var self = this;
        $column.find('.js--create').click(function() {
            var id = $column.find('.js--columnid').val();
            var name = $column.find('.js--columnname').val();
            if (id != '' && name != '') {
                var object = {
                    Id: id,
                    Name: name
                }
                array.push(object);
                self.SerializeConfiguration();
                self.UpdateTables();
                $column.find('.js--columnid').val('');
                $column.find('.js--columnname').val('');
            }
        });
    },
    InitPresetColumn: function() {
        var self = this;
        $(self.presetColumn).find('.js--create').click(function() {
            var presetproject = $(self.presetColumn).find(self.projectDropdowns).val();
            var presetarticle = $(self.presetColumn).find(self.articleDropdowns).val();
            var presetname = $(self.presetColumn).find('.js--columnname').val();
            if (presetname != '' && presetproject != '' && presetarticle != '') {
                var preset = {
                    Name: presetname,
                    Project: presetproject,
                    Article: presetarticle
                }
                self.presets.push(preset);
                self.SerializeConfiguration();
                self.UpdateTables();
                $(self.presetColumn).find(self.projectDropdowns).val('');
                $(self.presetColumn).find(self.articleDropdowns).val('');
                $(self.presetColumn).find('.js--columnname').val('');
            }
        });
    },
    UpdateTables: function() {
        var self = this;
        self.UpdateTable($(self.projectColumn), self.projecten);
        self.UpdateTable($(self.articleColumn), self.articles);
        self.UpdatePresets();
        EqualHeight($('.configuration .column .js--equalheighttable'));
        EqualHeight($('.configuration .column .js--equalheight'));
    },
    UpdateTable: function($column, array) {
        var self = this;
        self.UpdateDropdowns();
        $column.find('table tr').has('td').remove();
        for (var i = 0; i < array.length; i++) {
            var object = array[i];
            var objectTds = self.CreateTDs(object)
            var deletefield = self.CreateDeleteTD(i);
            var row = $('<tr></tr>').append(objectTds).append(deletefield)
            $column.find('table').append(row);
        }
        $column.find('.js--remove').click(function() {
            self.RemoveObject(array, $(this).data('id'));
        });
    },
    UpdateDropdowns: function() {
        var self = this;
        $('.js--projectselect, .js--articleselect').each(function() {
            $(this).find('option:gt(0)').remove();
        });
        self.UpdateDropdown(self.projectDropdowns, self.projecten);
        self.UpdateDropdown(self.articleDropdowns, self.articles);
    },
    UpdateDropdown: function(dropdown, array) {
        for (var i = 0; i < array.length; i++) {
            var object = array[i];
            var option = '<option value="' + object.Id + '">' + object.Name + '</option>';
            $(dropdown).append(option);
        }
    },
    UpdatePresets: function() {
        var self = this;
        $(self.presetColumn).find('table tr').has('td').remove();
        $('.js--presetbuttons input').remove();
        for (var p = 0; p < self.presets.length; p++) {
            var preset = self.presets[p];
            var presetname = $('<td>' + preset.Name + '</td>');
            var project = self.FindEntryById(self.projecten, preset.Project);
            var article = self.FindEntryById(self.articles, preset.Article);
            var projectTds = self.CreateTDs(project)
            var articleTds = self.CreateTDs(article)
            var presetdeleterow = self.CreateDeleteTD(p);
            var row = $('<tr></tr>').append(presetname).append(projectTds).append(articleTds).append(presetdeleterow)
            $(self.presetColumn).find('table').append(row);

            $('.js--presetbuttons').each(function() {
                var pr = preset;
                var presetButton = $('<input type="button" class="presetbutton" value="' + pr.Name + '">')
                $(this).append(presetButton);
                $('.js--dialog input[type=button], .js--dialog a, .js--dialog button').button();
                presetButton.click(function() {
                    var pre = pr;
                    $(this).closest('.js--dialog').find(self.projectDropdowns).val(pr.Project);
                    $(this).closest('.js--dialog').find(self.articleDropdowns).val(pr.Article);
                });
            });
        }
        $(self.presetColumn).find('.js--remove').click(function() {
            self.RemoveObject(self.presets, $(this).data('id'));
        });
    },
    FindEntryById: function(array, id) {
        var object = {
            Id: '',
            Name: ''
        };
        for (var i = 0; i < array.length; i++) {
            if (array[i].Id == id) {
                object = array[i];
            }
        }
        return object;
    },
    CreateTDs: function(object) {
        return $('<td>' + object.Name + '</td><td>' + object.Id + '</td>');
    },
    CreateDeleteTD: function(index) {
        return $('<td><a class="ui-icon ui-icon-closethick js--remove" href="#" data-id="' + index + '" ></a></td>');
    },
    RemoveObject: function(array, index) {
        var self = this;
        RemoveByIndex(array, index);
        self.SerializeConfiguration();
        self.UpdateTables();
    }
};