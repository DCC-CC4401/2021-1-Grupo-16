"""
Bazar app.
"""

from setuptools import setup

# Load requirements
with open('requirements.txt') as f:
    requirements = []
    for line in f:
        requirements.append(line.strip())

# Setup library
setup(
    name='Bazar',
    version='dev',
    author='G16',
    description='Bazar app',
    url='localhost',
    platforms=['any'],
    include_package_data=True,
    python_requires='>=3.7',
    install_requires=requirements,
    setup_requires=[
        'setuptools',
    ],
)
