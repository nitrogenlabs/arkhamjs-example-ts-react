import gulp from 'gulp';
import childProcess from 'child_process';

gulp.task('server:dev', done => {
  const exec = childProcess.exec;
  const proc = exec('nodemon --watch build development.js');

  proc.stderr.on('data', (data) => {
    return process.stdout.write(data);
  });
  proc.stdout.on('data', (data) => {
    return process.stdout.write(data);
  });
  proc.stdout.on('end', () => {
    done();
  });
});

gulp.task('server:prod', done => {
  const exec = childProcess.exec;
  const proc = exec('forever start production.js');

  proc.stderr.on('data', (data) => {
    return process.stdout.write(data);
  });
  proc.stdout.on('data', (data) => {
    return process.stdout.write(data);
  });
  proc.stdout.on('end', () => {
    done();
  });
});