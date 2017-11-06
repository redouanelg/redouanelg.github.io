%% Transport Inpainting
cd ./transport

imagefilename = 'ajit.png';
maskfilename  = 'ajit_mask.png';

% PARAMETERS
tol           = 1e-5;
maxiter       = 200; % 50
dt            = 0.1;
param.M       = 40; % number of steps of the inpainting procedure;
param.N       = 5; %2;  % number of steps of the anisotropic diffusion;
param.eps     = 1e-10;

inpainting_transport(imagefilename,maskfilename,maxiter,tol,dt,param)

cd ..