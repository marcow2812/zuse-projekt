/**
 * POS.Posit
 * JavaScript POSIT Algorithm
 * 
 * Ported from:
 * "DeMenthon/Davis - Model-Based Object Pose in 25 Lines of Code"
 * http://www.cfar.umd.edu/~daniel/daniel_papers.html
 */

var POS = POS || {};

POS.Posit = function(modelSize, focalLength) {
    this.modelSize = modelSize;
    this.focalLength = focalLength;
};

POS.Posit.prototype.pose = function(corners) {

    var modelSize = this.modelSize;
    var focalLength = this.focalLength;

    var pose = {};

    var i, j;

    var W = [];
    var M = [];

    var Mw = modelSize / 2;

    M[0] = [-Mw, Mw, 0];
    M[1] = [Mw, Mw, 0];
    M[2] = [Mw, -Mw, 0];
    M[3] = [-Mw, -Mw, 0];

    var A = [];
    var B = [];
    var C = [];

    for (i = 0; i < 4; i++) {
        var x = corners[i].x;
        var y = corners[i].y;

        A[i] = x;
        B[i] = y;
        C[i] = x * x + y * y;
    }

    var a11, a12, a13;
    var a21, a22, a23;
    var a31, a32, a33;

    var Tz;

    var bestError = 1e10;
    var bestRotation = null;
    var bestTranslation = null;

    for (var sign = -1; sign <= 1; sign += 2) {

        var S = [];

        for (i = 0; i < 3; i++) {
            S[i] = [];
            for (j = 0; j < 3; j++) {
                S[i][j] = 0;
            }
        }

        for (i = 0; i < 4; i++) {
            var Xi = M[i][0];
            var Yi = M[i][1];

            var Ai = A[i];
            var Bi = B[i];
            var Ci = C[i];

            S[0][0] += Xi * Xi;
            S[0][1] += Xi * Yi;
            S[0][2] += Xi;

            S[1][0] += Yi * Xi;
            S[1][1] += Yi * Yi;
            S[1][2] += Yi;

            S[2][0] += Xi;
            S[2][1] += Yi;
            S[2][2] += 1;
        }

        var detS =
            S[0][0] * (S[1][1] * S[2][2] - S[1][2] * S[2][1]) -
            S[0][1] * (S[1][0] * S[2][2] - S[1][2] * S[2][0]) +
            S[0][2] * (S[1][0] * S[2][1] - S[1][1] * S[2][0]);

        if (Math.abs(detS) < 1e-9) continue;

        var invS = [];

        for (i = 0; i < 3; i++) {
            invS[i] = [];
        }

        invS[0][0] = (S[1][1] * S[2][2] - S[1][2] * S[2][1]) / detS;
        invS[0][1] = (S[0][2] * S[2][1] - S[0][1] * S[2][2]) / detS;
        invS[0][2] = (S[0][1] * S[1][2] - S[0][2] * S[1][1]) / detS;

        invS[1][0] = (S[1][2] * S[2][0] - S[1][0] * S[2][2]) / detS;
        invS[1][1] = (S[0][0] * S[2][2] - S[0][2] * S[2][0]) / detS;
        invS[1][2] = (S[0][2] * S[1][0] - S[0][0] * S[1][2]) / detS;

        invS[2][0] = (S[1][0] * S[2][1] - S[1][1] * S[2][0]) / detS;
        invS[2][1] = (S[0][1] * S[2][0] - S[0][0] * S[2][1]) / detS;
        invS[2][2] = (S[0][0] * S[1][1] - S[0][1] * S[1][0]) / detS;

        var K = [];

        K[0] = invS[0][0] * C[0] + invS[0][1] * C[1] + invS[0][2] * C[2];
        K[1] = invS[1][0] * C[0] + invS[1][1] * C[1] + invS[1][2] * C[2];
        K[2] = invS[2][0] * C[0] + invS[2][1] * C[1] + invS[2][2] * C[2];

        Tz = (sign * focalLength) / Math.sqrt(K[0] + K[1] + K[2]);

        var Tx = (A[0] + A[1] + A[2] + A[3]) * Tz / 4;
        var Ty = (B[0] + B[1] + B[2] + B[3]) * Tz / 4;

        var R = [];

        for (i = 0; i < 3; i++) {
            R[i] = [];
        }

        var sumXX = 0, sumXY = 0, sumYX = 0, sumYY = 0;
        var sumXZ = 0, sumYZ = 0;

        for (i = 0; i < 4; i++) {
            var Xi = M[i][0];
            var Yi = M[i][1];

            var Ui = (A[i] - Tx) / Tz;
            var Vi = (B[i] - Ty) / Tz;

            sumXX += Xi * Ui;
            sumXY += Xi * Vi;
            sumYX += Yi * Ui;
            sumYY += Yi * Vi;
        }

        R[0][0] = sumXX / modelSize;
        R[0][1] = sumXY / modelSize;
        R[1][0] = sumYX / modelSize;
        R[1][1] = sumYY / modelSize;

        var r1 = Math.sqrt(R[0][0] * R[0][0] + R[1][0] * R[1][0]);
        var r2 = Math.sqrt(R[0][1] * R[0][1] + R[1][1] * R[1][1]);

        R[2][0] = R[0][1] * R[1][0] - R[0][0] * R[1][1];
        R[2][1] = R[0][0] * R[1][1] - R[0][1] * R[1][0];

        R[0][0] /= r1;
        R[1][0] /= r1;
        R[0][1] /= r2;
        R[1][1] /= r2;

        R[0][2] = 0;
        R[1][2] = 0;
        R[2][2] = 1;

        var error = 0;

        for (i = 0; i < 4; i++) {
            var Xi = M[i][0];
            var Yi = M[i][1];
            var Zi = 0;

            var Xi2 =
                R[0][0] * Xi + R[0][1] * Yi + R[0][2] * Zi + Tx / Tz;
            var Yi2 =
                R[1][0] * Xi + R[1][1] * Yi + R[1][2] * Zi + Ty / Tz;

            var xi = Xi2 * focalLength;
            var yi = Yi2 * focalLength;

            var dx = xi - A[i] * Tz;
            var dy = yi - B[i] * Tz;

            error += dx * dx + dy * dy;
        }

        if (error < bestError) {
            bestError = error;
            bestRotation = R;
            bestTranslation = { x: Tx, y: Ty, z: Tz };
        }
    }

    pose.bestRotation = bestRotation;
    pose.bestTranslation = bestTranslation;
    pose.bestError = bestError;

    return pose;
};
