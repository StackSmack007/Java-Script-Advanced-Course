/*jslint es6 */
"use strict";
let solution = {
    call: function (post, command) {
        const maxTotalVotesNoChange = 50;
        const downvote = post => post.downvotes++;
        const upvote = post => post.upvotes++;
        const score = function () {
            let totalVotes = post.upvotes + post.downvotes;
            let upVotes = post.upvotes + (totalVotes > maxTotalVotesNoChange ? Math.ceil(0.25 * Math.max(post.upvotes, post.downvotes)) : 0);
            let downVotes = post.downvotes + (totalVotes > maxTotalVotesNoChange ? Math.ceil(0.25 * Math.max(post.upvotes, post.downvotes)) : 0);
            let balance = upVotes - downVotes;
            let rating = totalVotes < 10 ? "new"
                : post.upvotes / totalVotes > 0.66 ? "hot"
                    : post.downvotes > post.upvotes ? "unpopular"
                        : post.upvotes > 100 || post.downvotes > 100 ? "controversial"
                            : "new"
            return [upVotes, downVotes, balance, rating];
        }

        return { downvote, upvote, score }[command](post);
    }
}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};

solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score');
for (let i = 0; i < 50; i++) {
    solution.call(post, 'downvote');
}
score = solution.call(post, 'score');     
