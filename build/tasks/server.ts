import * as childProcess from 'child_process';
import * as gulp from 'gulp';

gulp.task('server:dev', (done: () => void) => {
  const exec = childProcess.exec;
  const proc = exec('nodemon --watch build development.ts');

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

gulp.task('server:prod', (done: () => void) => {
  const exec = childProcess.exec;
  const proc = exec('forever start production.ts');

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
