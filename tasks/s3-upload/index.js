const AWS = require('aws-sdk');
const tl = require('vsts-task-lib/task');
const path = require('path');

const accessKeyId = tl.getInput('accessKeyId', true);
const secretAccessKey = tl.getInput('secretAccessKey', true);
const bucket = tl.getInput('bucket', true);
const file = tl.getPathInput('file', true);
const region = tl.getInput('region');
const endpoint = tl.getInput('endpoint');

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
    s3ForcePathStyle: true
})

var s3 = new AWS.S3({
    params: { Bucket: bucket },
    endpoint: endpoint
});

tl.debug('Uploading file...');

s3.upload({
    Key: path.basename(file),
    Body: file,
    ACL: 'public-read'
}, function (err, data) {
    if (err) {
        tl.setResult(tl.TaskResult.Failed, `Failed with error: ${err}`);
    }
    tl.setResult(tl.TaskResult.Succeeded, 'Update completed')
});