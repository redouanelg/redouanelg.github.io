clc
clear all

%% Problem Definition
g = @circleg;
c = 1;
a = 0;
f = 1;


%% PDE Coefficients and Boundary Conditions

% Plot the geometry and display the edge labels for use in the boundary condition definition.
figure
pdegplot(g,'EdgeLabels','on');
axis equal

% Create a PDE Model with a single dependent variable.
numberOfPDE = 1;
model = createpde(numberOfPDE);

%Create a geometry entity.
geometryFromEdges(model,g);

%Specify PDE coefficients.
specifyCoefficients(model,'m',0,'d',0,'c',c,'a',a,'f',f);

%The solution is zero at all four outer edges of the circle.
applyBoundaryCondition(model,'dirichlet','Edge',(1:4),'u',0);


%% Generate Initial Mesh
hmax = 1;
generateMesh(model,'Hmax',hmax);
figure
pdemesh(model);
axis equal



