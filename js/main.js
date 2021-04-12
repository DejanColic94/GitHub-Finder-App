$(document).ready(function() {
    // kada se kuca nesto u search bar trigger-uje se event
    // prosledimo parametar e koji predstavlja event
    // iz koga posle uzimamo sta nam treba
    $('#searchUser').on('keyup', function(e) {
        // e.target.value je vrednost ukucanog
        let username = e.target.value;

        // AJAX request
        // gadjamo GitHub api
        // jquery mnogo olaksava ajax
        $.ajax({
            // url koji gadjamo
            url : 'https://api.github.com/users/'+username,
            // saljemo creditentials (client id i client secret)
            // autorizovali smo app na github-u da bi imali
            // vise od 50 pristupa po satu
            data: {
                client_id: 'df04f0fa6e64e862a47f',
                client_secret: '2cd19e4ec31c2861e4e4150b26d8b53992353e9c'
            }
        }).done(function(user) {
            // ajax request za repos
            $.ajax({
                url : 'https://api.github.com/users/'+username+'/repos',
                data: {
                    client_id: 'df04f0fa6e64e862a47f',
                    client_secret: '2cd19e4ec31c2861e4e4150b26d8b53992353e9c',
                    // limit to 5 repos, sort by date
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos, function(index, repo) {
                    $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>:${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default">Forks: ${repo.forks_count}</span>
                                    <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                                    <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="dugme">Repo Page</a>
                                </div>
                            </div>

                        </div>
                    `)
                });
            });
            //done() jer ocekujemo da vrati promise
            // sad hocemo user data da stavimo u html
            $('#profile').html(`
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">${user.name}</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img class="thumbnail avatar" src="${user.avatar_url}">
                                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                                <span class="label label-success">Followers: ${user.followers}</span>
                                <span class="label label-info">Following: ${user.following}</span>
                            <br>
                            <br>
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Website/blog: ${user.blog}</li>
                                <li class="list-group-item">Location: ${user.location}</li>
                                <li class="list-group-item">Member since: ${user.created_at}</li>
                            </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <h3 class="page-headers">Latest Repos</h3>
                <div id="repos"></div>
            `);
        });

    });
});