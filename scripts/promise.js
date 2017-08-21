
(function($, _){
    var Api = {
        url: Util.ApiUri
    };

    $(function(){
        /**
         * JQuery Deferred
         * */
        function getList01(){
            var def = $.Deferred();
            $.ajax({
                url: Api.url + '/getList',
                dataType:'jsonp',
                data: '',
                jsonp: 'callback',
                success: function(resp){
                    def.resolve(resp);
                },
                error: function(err){
                    def.reject(err);
                }
            });
            return def.promise();
        }
        // getList01().then(function(data){
        //     console.log('getList01: ', data);
        //     const users = data.respData.list;
        //     Util.template('.users', 'users', users);
        // },function(err){});


        /**
         * JQuery Ajax
         * */
        function getList02(){
            return $.ajax({
                url: Api.url + '/getList',
                dataType:'jsonp',
                data: '',
                jsonp: 'callback'
            });
        }
        // getList02().then(function(data){
        //     //console.log('getList02: ', data);
        //     Util.template('#users', 'users', data.respData.list);
        // });


        /**
         * JQuery Promise
         * */
        function getAvatar(){
            return $.ajax({
                url: Api.url + '/getAvatar',
                dataType:'jsonp',
                data: '',
                jsonp: 'callback'
            });
        }
        // var users = [];
        // getList02().then(function(data){
        //     users = data.respData.list;
        //     return getAvatar();
        // }).then(function(resp){
        //     var avatars = resp.respData.list;
        //     users = _.map(users, function(user, index){
        //         user.avatar = avatars[index].avatar;
        //         return user;
        //     });
        //     Util.template('#users', 'users', users);
        // });


        /**
         * ES6 Promise
         * */
        function getList03(){
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: Api.url + '/getList',
                    dataType:'jsonp',
                    data: '',
                    jsonp: 'callback',
                    success(resp){ resolve(resp); },
                    error(err) { reject(err); }
                }).done(function (resp) {
                })
             });
        }
        function getAvatar02(){
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: Api.url + '/getAvatar',
                    dataType:'jsonp',
                    data: '',
                    jsonp: 'callback',
                    success(resp){ resolve(resp); },
                    error(err) { reject(err); }
                });
            });
        }

        /**
         * XMLHttpRequest 代替 ajax
         * */
        function getList04(name) {
            return new Promise((resolve, reject) => {
                var client = new XMLHttpRequest();
                client.open('GET', Api.url + name);
                client.onreadystatechange = function() {
                    if (this.readyState != 4) {
                        return;
                    } 
                    if(this.status >= 200 && this.status < 300 || this.status == 304) {
                        resolve(this.response);
                    } else {
                        reject(new Error(this.statusText));
                    }   
                };
                client.responseType = 'json';
                client.setRequestHeader('Accept', 'application/json');
                client.send();
            });
        }

        var users = new Array();
        
        getList04('/getList').then(data => {
            users = data.respData.list;
            return getList04('/getAvatar');
        }).then(resp => {
            var avatars = resp.respData.list;
            users = _.map(users, function(user, index){
                user.avatar = avatars[index].avatar;
                return user;
            });
            Util.template('#users', 'users', users);
        });


    });
})($, _);